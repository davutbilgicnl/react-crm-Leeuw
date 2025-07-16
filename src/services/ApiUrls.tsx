export const SERVER = process.env.REACT_APP_API_BASE_URL?.replace(/\/$/, '') || ''

export const AuthUrl = `${SERVER}/auth/google/`
export const OrgUrl = `${SERVER}/org`

export const LoginUrl = `${SERVER}/auth/login`
export const RegisterUrl = `${SERVER}/auth/register`
export const ForgotPasswordUrl = `${SERVER}/auth/forgot-password`

export const CompanyUrl = `${SERVER}/leads/company`
export const CompaniesUrl = `${SERVER}/leads/companies`

export const LeadUrl = `${SERVER}/leads`

export const ContactUrl = `${SERVER}/contacts`

export const OpportunityUrl = `${SERVER}/opportunities`

export const AccountsUrl = `${SERVER}/accounts`

export const CasesUrl = `${SERVER}/cases`

export const UsersUrl = `${SERVER}/users`
export const UserUrl = `${SERVER}/user`

export const ProfileUrl = `${SERVER}/profile`
