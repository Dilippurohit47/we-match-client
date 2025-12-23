    export  interface AuthProvider {
        user:string | null,
        isLoggedIn:boolean
        loading:boolean
      refreshUser: () => Promise<void>,

    }  