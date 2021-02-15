import { setError, removeError, startLoading, finishLoading } from "../../actions/ui"
import { types } from "../../types/types";

describe('Tests in ui actions', () => {
    
    
    test('should create setError action', () => {
        const action = setError('sos');
        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'sos'
        });
    });

    test('should remove Error action', () => {
        const removeErrorAction = removeError();
        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        });
    })
    
    test('should start loading ui action', () => {
        const startLoadingAction = startLoading();
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        });
    })
    
    test('should finishLoading  ui action', () => {
        const finishLoadingAction = finishLoading();
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });
    })
    

})
