export const nameRoutes = {
  login: 'login',
  lockedCamera: 'locked-camera',
  registerRequest: 'register-request',
  registerUser: 'register-user',
  recoveryPassword : 'recovery-password',
  forgotRecoveryPassword : 'forgot-recovery-password',
  requestQuota: 'request-quota',
  dashboard: 'dashboard',
  credits: 'credits',
  creditDetail: 'credit-detail',
  creditsHistory: 'credit-history',
  centersAutorization: 'welcome',
  tokenRoot: 'token',
  validateToken: 'validate-token',
  identityValidation: 'identity-validation',
  createPassword: 'create-password',
  confirmedEmail: 'confirmed-email',
  main: 'dashboard',
  payments: 'payments',
  lockedLocation: 'locked-location',
  quickPayment: 'quick-payment',
  updateData: 'update-data',
  bridgePay: 'bridge-pay',
  landingPage: 'landing-page'
};

export const mapRoutes = {
1: nameRoutes.dashboard,
2: nameRoutes.dashboard,
3: nameRoutes.registerRequest,
4: nameRoutes.tokenRoot + '/' + nameRoutes.identityValidation
};