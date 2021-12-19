import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Login;

function Login() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className="login-form">
                <h2>Login to your account</h2>
                <br />
                <div className="login-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <h5 className='mb-3'>Username</h5>
                            <input name="username" placeholder='Type...' type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <h5 className='mb-3'>Password</h5>
                            <input name="password" placeholder='Type...' type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <br />
                        <div className='button-form'>
                            <div className="check-group">
                                <div className="form-check w-50">
                                    <input type="checkbox" value={false} id='flexCheckIndeterminate' className='form-check-input' />
                                    <label class="form-check-label" for="flexCheckIndeterminate">Remember me</label>
                                </div>
                                <div className="forgot-pass w-50">
                                    <Link href="/account/forgot-pass" className="btn-link">Forgot Password?</Link>
                                </div>
                            </div>
                            <br />
                            <div className='button-group'>
                                <button disabled={formState.isSubmitting} className="btn btn-primary button-login">
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                            </div>
                            <br />
                            <p>
                                Do you have an account? <Link href="/account/register" className="btn-link">Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
