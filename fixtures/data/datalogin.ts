type loginType = 'correcto' | 'incorrecto' | 'bloqueado' | 'vacio';

export const loginData: Record<loginType, { username: string; password: string }> = {
  correcto: { username: 'standard_user', password: 'secret_sauce' },
  incorrecto: { username: 'standard_user', password: 'passwordincorrecto' },
  bloqueado: { username: 'locked_out_user', password: 'secret_sauce' },
  vacio: { username: '', password: 'secret_sauce' },
};