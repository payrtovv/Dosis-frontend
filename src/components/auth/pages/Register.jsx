import { useState } from 'react'
import AxiosInstance from './Axios'
import './auth.css'
import { useNavigate } from 'react-router-dom'   

export default function Register() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: undefined })
    }

    const navigate = useNavigate()                
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (form.password !== form.confirmPassword) {
            setErrors({ confirmPassword: 'Las contraseñas no coinciden' })
            return
        }

        setLoading(true)
        try {
            const { confirmPassword, ...data } = form
            await AxiosInstance.post('register/', data)
            setSuccess(true)
            setErrors({})
            navigate('/', {replace:true})
        } catch (error) {
            if (error.response?.status === 400) {
                setErrors(error.response.data)
            } else {
                setErrors({ general: 'No se pudo conectar con el servidor' })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Crear cuenta</h2>
                <p className="auth-subtitle">Regístrate para comenzar</p>

                {success && (
                    <div className="alert alert-success">
                        Cuenta creada correctamente
                    </div>
                )}
                {errors.general && (
                    <div className="alert alert-error">{errors.general}</div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="tucorreo@ejemplo.com"
                            value={form.email}
                            onChange={handleChange}
                            className={errors.email ? 'input-error' : ''}
                            required
                        />
                        {errors.email && (
                            <span className="error-text">{errors.email}</span>
                        )}
                    </div>

                    <div className="field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            className={errors.password ? 'input-error' : ''}
                            required
                        />
                        {errors.password && (
                            <span className="error-text">{errors.password}</span>
                        )}
                    </div>

                    <div className="field">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'input-error' : ''}
                            required
                        />
                        {errors.confirmPassword && (
                            <span className="error-text">{errors.confirmPassword}</span>
                        )}
                    </div>

                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Creando cuenta...' : 'Registrarse'}
                    </button>
                </form>

                <p className="auth-footer">
                    ¿Ya tienes cuenta? <a href="/">Inicia sesión</a>
                </p>
            </div>
        </div>
    )
}