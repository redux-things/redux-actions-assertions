import expect from 'expect';
import * as actionUtils from '../../src/asserts/actionUtils';
import { toDispatchActionsWithState } from '../../src/asserts/toDispatchActionsWithState';
import getInitialStoreState from '../../src/initialState';

describe('assertions', () => {
  describe('toDispatchActionsWithState', () => {
    const initialState = getInitialStoreState();
    const actualAction = { actualAction: 'actualAction' };
    const expectedAction = { expectedAction: 'expectedAction' };
    const spyDone = expect.createSpy();

    afterEach(() => {
      expect.restoreSpies();
    });

    it('should be function', () => { expect(toDispatchActionsWithState).toBeA('function');});

    describe('when "actualAction" is not a function or an object', () => {
      it('should throw Error', () => {
        expect(toDispatchActionsWithState)
          .withArgs(initialState, 'test', expectedAction, spyDone)
          .toThrow();
      });
    });

    describe('when "expectedActions" not a function, not an object and not an array', () => {
      it('should throw Error', () => {
        expect(toDispatchActionsWithState)
          .withArgs([initialState, actualAction, 'test', spyDone])
          .toThrow();
      });
    });

    describe('when called', () => {
      let getDispatchedActionsSpy;
      let unrollActionsSpy;

      beforeEach(() => {
        getDispatchedActionsSpy = expect.spyOn(actionUtils, 'getDispatchedActions');
        unrollActionsSpy = expect.spyOn(actionUtils, 'unrollActions');
      });

      it('should call getDispatchedActions with initialState and action', () => {
        getDispatchedActionsSpy.andReturn(Promise.reject());
        toDispatchActionsWithState(initialState, actualAction, [expectedAction], spyDone);

        expect(getDispatchedActionsSpy)
          .toHaveBeenCalledWith(initialState, actualAction);
      });

      describe('when getDispatchedActions rejects', () => {
        const err = { errorProp: 'errorValue' };
        beforeEach(() => {
          getDispatchedActionsSpy.andReturn(Promise.reject(err));
        });

        describe('when fail callback is passed', (done) => {
          const spyFail = expect.createSpy();

          it('should call fail callback with rejection reason as argument', () => {
            toDispatchActionsWithState(
              initialState,
              actualAction,
              expectedAction,
              spyDone,
              spyFail
            ).catch(() => {
              expect(spyFail)
                .toHaveBeenCalledWith(err);
              done();
            });
          });
        });

        describe('when fail callback is not passed', (done) => {
          it('should call done callback with rejection reason as argument', () => {
            toDispatchActionsWithState(
              initialState,
              actualAction,
              expectedAction,
              spyDone
            ).catch(() => {
              expect(spyDone)
                .toHaveBeenCalledWith(err);
              done();
            });
          });
        });

        describe('when done callback is passed', (done) => {
          it('should throw Error with with rejection reason as json', () => {
            try {
              toDispatchActionsWithState(initialState, actualAction, expectedAction);
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
          toDispatchActionsWithState(
            initialState,
            actualAction,
            expectedAction,
            spyDone
          ).then(() => {
            expect(unrollActionsSpy)
              .toHaveBeenCalledWith(initialState, expectedAction);

            done();
          });
        });

        describe('when unrollActions rosolves', () => {
          const unrolledActions = [{ type: 'testAction' }];
          let assertDispatchedActionsSpy;

          beforeEach(() => {
            unrollActionsSpy.andReturn(Promise.resolve(unrolledActions));
            assertDispatchedActionsSpy = expect.spyOn(actionUtils, 'assertDispatchedActions');
          });

          it('should call assertDispatchedActions with actual and expected actions', () => {
            toDispatchActionsWithState(initialState, actualAction, expectedAction, spyDone)
              .then(() => {
                expect(assertDispatchedActionsSpy)
                  .toHaveBeenCalledWith(dispatchedActions, unrolledActions);
              });
          });

          it('should call done callback if it passed', () => {
            toDispatchActionsWithState(initialState, actualAction, expectedAction, spyDone)
              .then(() => {
                expect(spyDone).toHaveBeenCalled();
              });
          });
        });
      });
    });
  });
});
