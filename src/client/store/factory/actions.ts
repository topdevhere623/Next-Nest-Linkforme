import { ActionCreator, AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Field } from 'src/server/users/interfaces/user.interface';
import { fetch } from 'src/shared/utils/fetch';
import { v4 as uuidv4 } from 'uuid';
import { IStoreState } from '../reducers';

export type ExtraArgument = {};

export type ThunkCreator<R = Promise<any>> = ActionCreator<
  ThunkAction<R, IStoreState, ExtraArgument, AnyAction>
>;

export const addField: ThunkCreator<Promise<any>> = (newField: Field) => {
  return async (dispatch: Dispatch, getState: () => IStoreState) => {
    let state = getState();
    let newFields;
    if (state.factory.editing) {
      newFields = [...state.factory.editFields];
    } else {
      newFields = [...state.factory.fields];
      dispatch({ type: 'setEdit' });
    }
    newField.id = 'item-' + uuidv4();
    newFields.push(newField);
    dispatch({ type: 'setEditFields', payload: newFields });
  };
};

export const addSocialIcon: ThunkCreator<Promise<any>> = (newField: Field) => {
  return async (dispatch: Dispatch, getState: () => IStoreState) => {
    let state = getState();
    let newFields = [...state.factory.fields];

    newField.id = 'item-' + uuidv4();
    newFields.push(newField);
    dispatch({ type: 'setFields', payload: newFields });
  };
};

export const uploadFields: ThunkCreator<Promise<any>> = () => {
  return async (dispatch: Dispatch, getState: () => IStoreState) => {
    const state = getState();
    const result = await fetch('/api/setFields', {
      method: 'POST',
      body: JSON.stringify({ newFields: state.factory.fields }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(() => {});

    if (result && result._id) {
      dispatch({ type: 'setFields', payload: result.fields });
    } else {
      console.log('result', result);
      alert('Cant upload social icon. Try again!');
    }
  };
};

export const setEditDone: ThunkCreator<Promise<any>> = () => {
  return async (dispatch: Dispatch, getState: () => IStoreState) => {
    let state = getState(),
      result = await fetch('/api/setFields', {
        method: 'POST',
        body: JSON.stringify({ newFields: state.factory.editFields }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(() => {});

    if (result && result._id) {
      dispatch({ type: 'setEditDone' });
    } else {
      console.log('result', result);
      alert('Cant upload edited fields. Try again!');
    }
  };
};

export const doneSingleEdit: ThunkCreator<Promise<any>> = () => {
  return async (dispatch: Dispatch, getState: () => IStoreState) => {
    let state = getState(),
      result = await fetch('/api/setFields', {
        method: 'POST',
        body: JSON.stringify({ newFields: state.factory.fields }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(() => {});

    if (result && result._id) {
      dispatch({ type: 'setEditElement', payload: '' });
    } else {
      console.log('result', result);
      alert('Cant upload edited fields. Try again!');
    }
  };
};

export const deleteSingle: ThunkCreator<Promise<any>> = (fieldId) => {
  return async (dispatch: Dispatch, getState: () => IStoreState) => {
    let state = getState(),
      newFields = state.factory.fields.filter((item) => item.id !== fieldId),
      result = await fetch('/api/setFields', {
        method: 'POST',
        body: JSON.stringify({ newFields: newFields }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(() => {});

    if (result && result._id) {
      dispatch({ type: 'setFields', payload: result.fields });
    } else {
      console.log('result', result);
      alert('Cant upload edited fields. Try again!');
    }
  };
};

export const setAvatar: ThunkCreator<Promise<any>> = (file) => {
  return async (dispatch: Dispatch) => {
    let form = new FormData();

    form.append('file', file);

    let result = await fetch('/api/setAvatar', {
      method: 'POST',
      body: form,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).catch(() => {});

    if (result && result.avatar) {
      dispatch({ type: 'setUser', payload: { avatar: result.avatar } });
    } else {
      console.log('result', result);
      alert('Cant upload avatar. Try again!');
    }
  };
};

export const setThumbPic: ThunkCreator<Promise<any>> = (
  file,
  fieldId,
  singleEdit,
) => {
  return async (dispatch: Dispatch, getState: () => IStoreState) => {
    let form = new FormData();
    form.append('file', file);
    let result = await fetch('/api/setThumbPic', {
      method: 'POST',
      body: form,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).catch(() => {});

    if (result && result.filename) {
      dispatch({
        type: singleEdit ? 'updateFieldSingle' : 'updateField',
        payload: { fieldId, fieldName: 'thumbPic', value: result.filename },
      });

      let stateNew = getState(),
        resultSetFields = await fetch('/api/setFields', {
          method: 'POST',
          body: JSON.stringify({
            newFields: stateNew.factory[singleEdit ? 'fields' : 'editFields'],
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).catch(() => {});

      // if(resultSetFields && resultSetFields._id) {
      //     dispatch({type: 'setEditElement', payload: ''})
      // }
    } else {
      console.log('result', result);
      alert('Cant upload thumb. Try again!');
    }
  };
};

export const setBackgroundColor: ThunkCreator<Promise<any>> = (color: string) => {
  return async (dispatch: Dispatch, getState: () => IStoreState) => {
    const theme = {
      custom: {
        backgroundColor: color
      },
    };

    dispatch({
      type: 'setTheme',
      payload: theme,
    });

    let apiResult = await fetch('/api/setTheme', {
      method: 'POST',
      body: JSON.stringify({ newTheme: theme }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(() => {});

    if (!(apiResult && apiResult.theme)) {
      console.log('result', apiResult);
      alert('Cant upload theme. Try again!');
    }
  };
}

export const setYourImage: ThunkCreator<Promise<any>> = (file) => {
  return async (dispatch: Dispatch, getState: () => IStoreState) => {
    let form = new FormData();
    form.append('file', file);
    let result = await fetch('/api/setYourImage', {
      method: 'POST',
      body: form,
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).catch(() => {});

    if (result && result.filename) {
      console.log('result!!! :::', result);

      const theme = {
        custom: {
          background: result.filename,
        },
      };

      dispatch({
        type: 'setTheme',
        payload: theme,
      });

      let apiResult = await fetch('/api/setTheme', {
        method: 'POST',
        body: JSON.stringify({ newTheme: theme }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(() => {});

      if (!(apiResult && apiResult.theme)) {
        console.log('result', apiResult);
        alert('Cant upload theme. Try again!');
      }
    } else {
      console.log('result', result);
      alert('Cant upload thumb. Try again!');
    }
  };
};

export const setTheme: ThunkCreator<Promise<any>> = (theme) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'setTheme', payload: theme });
    let result = await fetch('/api/setTheme', {
      method: 'POST',
      body: JSON.stringify({ newTheme: theme }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(() => {});

    if (!(result && result.theme)) {
      console.log('result', result);
      alert('Cant upload theme. Try again!');
    }
  };
};

export const getAnalytics: ThunkCreator<Promise<any>> = () => {
  return async (dispatch: Dispatch) => {
    let result = await fetch('/api/getAnalytics', {
      method: 'GET',
    }).catch(() => {});

    if (result) {
      dispatch({ type: 'setAnalytics', payload: result });
    }
  };
};

export const updateUser: ThunkCreator<Promise<any>> = (data) => {
  return async (dispatch: Dispatch) => {
    let result = await fetch('/api/updateUser', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(() => {});

    if (!(result && result.login)) {
      console.log('result', result);
      alert('Cant update user. Try again!');
    } else {
      const userPayload: any = {};

      if (result?.email) {
        userPayload.email = result.email;
      }

      if (result?.login) {
        userPayload.login = result.login;
      }

      dispatch({ type: 'setUser', payload: userPayload });
    }

    return result;
  };
};

export const deleteUser: ThunkCreator<Promise<any>> = (data) => {
  return async () => {
    let confirmDelete = confirm('Are u sure delete this user?');

    if (!confirmDelete) {
      return;
    }

    let result = await fetch('/api/deleteUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(() => {});

    console.log('result', result);

    if (!(result && result.ok)) {
      console.log('result', result);
      alert('Cant delete user. Try again!');
    } else {
      if (typeof document !== 'undefined') {
        document.location.pathname = '/login';
      }
    }
  };
};
