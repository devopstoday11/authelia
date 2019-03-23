
import * as Actions from './actions';
import { ActionType, getType, StateType } from 'typesafe-actions';
import Method2FA from '../../../types/Method2FA';

export type SecondFactorAction = ActionType<typeof Actions>;

interface SecondFactorState {
  logoutLoading: boolean;
  logoutSuccess: boolean | null;
  error: string | null;

  userAnotherMethod: boolean;

  preferedMethodLoading: boolean;
  preferedMethodError: string | null;
  preferedMethod: Method2FA | null;

  setPreferedMethodLoading: boolean;
  setPreferedMethodError: string | null;
  setPreferedMethodSuccess: boolean | null;

  securityKeySupported: boolean;
  securityKeySignLoading: boolean;
  securityKeySignSuccess: boolean | null;

  oneTimePasswordVerificationLoading: boolean,
  oneTimePasswordVerificationSuccess: boolean | null,
  oneTimePasswordVerificationError: string | null,
}

const secondFactorInitialState: SecondFactorState = {
  logoutLoading: false,
  logoutSuccess: null,
  error: null,

  userAnotherMethod: false,

  preferedMethod: null,
  preferedMethodError: null,
  preferedMethodLoading: false,

  setPreferedMethodLoading: false,
  setPreferedMethodError: null,
  setPreferedMethodSuccess: null,

  securityKeySupported: false,
  securityKeySignLoading: false,
  securityKeySignSuccess: null,

  oneTimePasswordVerificationLoading: false,
  oneTimePasswordVerificationError: null,
  oneTimePasswordVerificationSuccess: null,
}

export type PortalState = StateType<SecondFactorState>;

export default (state = secondFactorInitialState, action: SecondFactorAction): SecondFactorState => {
  switch(action.type) {
    case getType(Actions.logout):
      return {
        ...state,
        logoutLoading: true,
        logoutSuccess: null,
        error: null,
      };
    case getType(Actions.logoutSuccess):
      return {
        ...state,
        logoutLoading: false,
        logoutSuccess: true,
      };
    case getType(Actions.logoutFailure):
      return {
        ...state,
        logoutLoading: false,
        error: action.payload,
      }
      
    case getType(Actions.securityKeySign):
      return {
        ...state,
        securityKeySignLoading: true,
        securityKeySignSuccess: false,
      };
    case getType(Actions.securityKeySignSuccess):
      return {
        ...state,
        securityKeySignLoading: false,
        securityKeySignSuccess: true,
      };
    case getType(Actions.securityKeySignFailure):
      return {
        ...state,
        securityKeySignLoading: false,
        securityKeySignSuccess: false,
      };

    case getType(Actions.setSecurityKeySupported):
      return {
        ...state,
        securityKeySupported: action.payload,
      };

    case getType(Actions.oneTimePasswordVerification):
      return {
        ...state,
        oneTimePasswordVerificationLoading: true,
        oneTimePasswordVerificationError: null,
      }
    case getType(Actions.oneTimePasswordVerificationSuccess):
      return {
        ...state,
        oneTimePasswordVerificationLoading: false,
        oneTimePasswordVerificationSuccess: true,
      }
    case getType(Actions.oneTimePasswordVerificationFailure):
      return {
        ...state,
        oneTimePasswordVerificationLoading: false,
        oneTimePasswordVerificationError: action.payload,
      }
    case getType(Actions.getPreferedMethod):
      return {
        ...state,
        preferedMethodLoading: true,
        preferedMethod: null,
        preferedMethodError: null,
      }
    case getType(Actions.getPreferedMethodSuccess):
      return {
        ...state,
        preferedMethodLoading: false,
        preferedMethod: action.payload,
      }
    case getType(Actions.getPreferedMethodFailure):
      return {
        ...state,
        preferedMethodLoading: false,
        preferedMethodError: action.payload,
      }
    case getType(Actions.setPreferedMethod):
      return {
        ...state,
        setPreferedMethodLoading: true,
        setPreferedMethodSuccess: null,
        preferedMethodError: null,
      }
    case getType(Actions.getPreferedMethodSuccess):
      return {
        ...state,
        setPreferedMethodLoading: false,
        setPreferedMethodSuccess: true,
      }
    case getType(Actions.getPreferedMethodFailure):
      return {
        ...state,
        setPreferedMethodLoading: false,
        setPreferedMethodError: action.payload,
      }
    case getType(Actions.setUseAnotherMethod):
      return {
        ...state,
        userAnotherMethod: action.payload,
      }
  }
  return state;
}