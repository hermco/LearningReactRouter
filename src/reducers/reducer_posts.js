import { FETCH_POSTS, GET_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {},action){ //state is an object!
  switch(action.type){
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data,'id');
    case GET_POST:
      return {...state, [action.payload.data.id]:action.payload.data };
    case DELETE_POST:
      return _.omit(state, action.payload); //it's only the id in the payload
    default:
      return state;
  }
}
