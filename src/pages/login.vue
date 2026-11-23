<template>
  <q-page class="login-page flex flex-center">
    <q-card class="login-card">
      <q-card-section class="text-center q-pt-xl">
        <q-avatar size="76px" color="primary" text-color="white">
          <q-icon name="medical_services" size="42px" />
        </q-avatar>

        <div class="text-h5 text-weight-bold q-mt-md">Sistema de Tópico</div>

        <div class="text-subtitle2 text-grey-7 q-mt-sm">Gestión de atenciones e inventario</div>
      </q-card-section>

      <q-card-section class="q-px-xl q-pt-lg">
        <q-form @submit.prevent="iniciarSesion" class="q-gutter-md">
          <q-input
            v-model.trim="correo"
            label="Correo institucional"
            type="email"
            autocomplete="username"
            outlined
            lazy-rules
            :rules="[
              (val) => !!val || 'Ingresa tu correo',
              (val) => /.+@.+\..+/.test(val) || 'Correo no válido',
            ]"
          >
            <template #prepend>
              <q-icon name="mail" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            label="Contraseña"
            :type="mostrarPassword ? 'text' : 'password'"
            autocomplete="current-password"
            outlined
            lazy-rules
            :rules="[(val) => !!val || 'Ingresa tu contraseña']"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>

            <template #append>
              <q-icon
                :name="mostrarPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="mostrarPassword = !mostrarPassword"
              />
            </template>
          </q-input>

          <q-banner v-if="error" class="bg-red-1 text-negative rounded-borders">
            {{ error }}
          </q-banner>

          <q-btn
            label="Iniciar sesión"
            type="submit"
            color="primary"
            class="full-width q-mt-lg"
            size="lg"
            unelevated
            :loading="cargando"
            :disable="cargando"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center text-grey-6 text-caption q-pb-lg">
        Sistema interno de atención del tópico
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth-store';

const router = useRouter();
const authStore = useAuthStore();

const correo = ref('');
const password = ref('');
const mostrarPassword = ref(false);
const cargando = ref(false);
const error = ref('');

async function iniciarSesion() {
  error.value = '';
  cargando.value = true;

  try {
    await authStore.login(correo.value, password.value);
    await router.push('/dashboard');
  } catch (e: unknown) {
    const err = e as {
      response?: {
        data?: {
          message?: string | string[];
        };
      };
      message?: string;
    };

    const mensaje = err.response?.data?.message;

    if (Array.isArray(mensaje)) {
      error.value = mensaje.join(', ');
    } else if (typeof mensaje === 'string') {
      error.value = mensaje;
    } else if (!err.response) {
      error.value = 'No se pudo conectar con el servidor. Verifica que NestJS esté ejecutándose.';
    } else {
      error.value = 'No se pudo iniciar sesión. Verifica tus credenciales.';
    }

    console.error('Error de inicio de sesión:', e);
  } finally {
    cargando.value = false;
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  padding: 24px;
  background: linear-gradient(135deg, #edf4ff 0%, #f7f9fc 55%, #e8f5f1 100%);
}

.login-card {
  width: 100%;
  max-width: 430px;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(31, 55, 85, 0.12);
}

@media (max-width: 480px) {
  .login-page {
    padding: 16px;
  }

  .login-card {
    border-radius: 16px;
  }
}
</style>
