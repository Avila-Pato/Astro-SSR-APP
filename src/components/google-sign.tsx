import { signInWithGoogle } from '../lib/auth-client';

export default function  GoogleSign()  {
  return (
    <button 
    className='btn btn-soft btn-info'
    onClick={ async () => {
        try {
            const res = await signInWithGoogle();
             if (res?.success) {
                console.log(res.success)
             }
        } catch (error) {
            console.error("error", error)
        }
    }}>
        Sign In with Google
    </button>
  )
}

