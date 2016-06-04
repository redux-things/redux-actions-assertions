import expect from 'expect';
import { getInitialStoreState } from '../../../src/initialState';
import { performAssertion } from '../../../src/asserts/utils/performAssertion';
import * as getDispatchedActionsObj from '../../../src/asserts/utils/getDispatchedActions';
import * as unrollActionsObj from '../../../src/asserts/utils/unrollActions';

describe('assertion utils', () => {
  describe('performAction', () => {
    const testAssertFunction = expect.createSpy();
    const initialState = getInitialStoreState();
    const actualAction = { actualAction: 'actualAction' };
    const expectedAction = { expectedAction: 'expectedAction' };
    const spyDone = expect.createSpy();

    afterEach(() => {
      expect.restoreSpies();
    });

    it('should be function', () => { expect(performAssertion).toBeA('function'); });

    describe('when "action" is not a function or an object', () => {
      it('should throw Error', () => {
        expect(() => {
          performAssertion(testAssertFunction, initialState, 'test', expectedAction, spyDone);
        }).toThrow();
      });
    });

    describe('when "expectedActions" not a function, not an object and not an array', () => {
      it('should throw Error', () => {
        expect(() => {
          performAssertion(testAssertFunction, initialState, actualAction, 'test', spyDone);
        }).toThrow();
      });
    });

    describe('when called', () => {
      let getDispatchedActionsSpy;
      let unrollActionsSpy;

      beforeEach(() => {
        getDispatchedActionsSpy = expect.spyOn(getDispatchedActionsObj, 'getDispatchedActions');
        unrollActionsSpy = expect.spyOn(unrollActionsObj, 'unrollActions');
      });

      it('should call getDispatchedActions with initialState and action', () => {
        getDispatchedActionsSpy.andReturn(Promise.reject());
        performAssertion(testAssertFunction, initialState, actualAction, [expectedAction], spyDone);

        expect(getDispatchedActionsSpy)
          .toHaveBeenCalledWith(initialState, actualAction);
      });

      describe('when getDispatchedActions rejects', () => {
        const err = { errorProp: 'errorValue' };
        beforeEach(() => {
          getDispatchedActionsSpy.andReturn(Promise.reject(err));
        });

        describe('when fail callback is spicified', (done) => {
          const spyFail = expect.createSpy();

          it('should call fail callback with rejection reason as argument', () => {
            performAssertion(
              testAssertFunction,
              initialState,
              actualAction,
              expectedAction,
              spyDone,
              spyFail
            ).catch(() => {
              expect(spyFail).toHaveBeenCalledWith(err);
              done();
            });
          });
        });

        describe('when fail callback is not spicified', (done) => {
          it('should call done callback with rejection reason as argument', () => {
            performAssertion(
              testAssertFunction,
              initialState,
              actualAction,
              expectedAction,
              spyDone
            ).catch(() => {
              expect(spyDone).toHaveBeenCalledWith(err);
              done();
            });
          });
        });

        describe('when done callback is spicified', (done) => {
          it('should throw Error with with rejection reason as json', () => {
            try {
              performAssertion(testAssertFunction, initialState, actualAction, expectedAction);
            } catch (error) {
              expect(error).toBe(JSON.stringify(error));
              done();
            }
          });
        });
      });

      describe('when getDispatchedActions rosolves', () => {
        const dispatchedActions = [{ type: 'testAction' }];
        beforeEach(() => {
          getDispatchedActionsSpy.andReturn(Promise.resolve(dispatchedActions));
        });

        it('should call unrollActions with initialState and expectedActions', (done) => {
          performAssertion(
            testAssertFunction,
            initialState,
            actualAction,
            expectedAction,
            spyDone
          ).then(() => {
            expect(unrollActionsSpy).toHaveBeenCalledWith(initialState, expectedAction);

            done();
          });
        });

        describe('when unrollActions rosolves', () => {
          const unrolledActions = [{ type: 'testAction' }];

          beforeEach(() => {
            unrollActionsSpy.andReturn(Promise.resolve(unrolledActions));
          });

          it('should call assertionFunction with actual and expected actions', () => {
            performAssertion(
              testAssertFunction,
              initialState,
              actualAction,
              expectedAction,
              spyDone
            ).then(() => {
              expect(testAssertFunction)
                .toHaveBeenCalledWith(dispatchedActions, unrolledActions);
            });
          });

          it('should call done callback if it spicified', () => {
            performAssertion(
              testAssertFunction,
              initialState,
              actualAction,
              expectedAction,
              spyDone
            ).then(() => {
              expect(spyDone).toHaveBeenCalled();
            });
          });
        });
      });
    });
  });
});
