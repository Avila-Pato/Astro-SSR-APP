import { signInWithGithub } from '../lib/auth-client';

export default function  GithubSign()  {
  return (
    <button 
    className='btn btn-soft btn-info'
    onClick={ async () => {
        try {
            const res = await signInWithGithub();
             if (res?.success) {
                console.log(res.success)
             }
        } catch (error) {
            console.error("error", error)
        }
    }}>
        Sign In with Github
    </button>
  )
}

