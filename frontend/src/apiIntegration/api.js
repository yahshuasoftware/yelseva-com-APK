
const backendDomain=  "http://192.168.31.163:8080"



const SummaryApi = {

    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/login`,
        method: "post"
    },
    profile: {
        url: `${backendDomain}/api/profile`,
        method: "Get"
    },
    addDepartment: {
        url: `${backendDomain}/api/departments`,
        
    },
    addCertificates: {
        url: `${backendDomain}/api/departments/add-certificates`,
        
    },
    users: {
        url: `${backendDomain}/api/users`,
        method: "Get"
    },
    documents: {
        url: `${backendDomain}/api/documents`,
        method: "Get"
    },
    payment:{
        url:`${backendDomain}/api/payment/checkout`
    },
    sendOtp:{
        url:`${backendDomain}/api/send-otp`,
        method:"Post"
    },
    verifyOtp:{
        url:`${backendDomain}/api/verify-otp`,
        method:"Post"
    },
    adminUsers: {
        url: `${backendDomain}/api/adminusers`,
        method: "GET",
      },
      changeRole: {
        url: `${backendDomain}/api/changerole`,
        method: "POST",
      },
      deleteUser: {
        url: `${backendDomain}/api/users`,
        
      },
      assignedCertificates: {
        url: `${backendDomain}/api/assigned-tasks`, 
        method: 'GET',
      },
      CertificatesStatusHandle:{
        url: `${backendDomain}/api/certificates`,

      },
      CertificatesRevertHandle:{
        url:`${backendDomain}/api/revert-certificate`
      },
      uplodeRevertDocuments:{
        url:`${backendDomain}/api/users`
      },
      UpdateUser:{
        url:`${backendDomain}/api/update-user`
      }


}
export default SummaryApi;
