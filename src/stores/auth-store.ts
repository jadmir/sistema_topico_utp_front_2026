import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../services/api';

interface Usuario {
  id: number;
  correo: string;
  nombres?: string;
  apellidos?: string;
  rol_id: number;
}

interface RespuestaLogin {
  access_token?: string;
  accessToken?: string;
  token?: string;
  usuario?: Usuario;
  user?: Usuario;
}

export const useAuthStore = defineStore('auth', () => {
  const usuario = ref<Usuario | null>(null);
  const token = ref<string | null>(sessionStorage.getItem('access_token'));

  const autenticado = computed(() => Boolean(token.value));

  async function login(correo: string, password: string) {
    const { data } = await api.post<RespuestaLogin>('/auth/login', { correo, password });

    const accessToken = data.access_token ?? data.accessToken ?? data.token;

    if (!accessToken) {
      throw new Error('El backend no devolvió un token de acceso.');
    }

    token.value = accessToken;
    sessionStorage.setItem('access_token', accessToken);

    usuario.value = data.usuario ?? data.user ?? null;

    return data;
  }

  function logout() {
    token.value = null;
    usuario.value = null;
    sessionStorage.removeItem('access_token');
  }

  return {
    usuario,
    token,
    autenticado,
    login,
    logout,
  };
});
