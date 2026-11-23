```vue
<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Menú lateral -->
    <DashboardSidebar
      v-model="menuAbierto"
      :active-section="seccionActiva"
      @select-section="seleccionarSeccion"
    />

    <!-- Contenedor obligatorio para las páginas de Quasar -->
    <q-page-container>
      <q-page class="dashboard-page">
        <main class="main-content">
          <!-- Encabezado y botón hamburguesa -->
          <DashboardHeader
            :section="seccionActiva"
            :user-name="nombreUsuario"
            :user-email="authStore.usuario?.correo ?? ''"
            @logout="cerrarSesion"
            @toggle-drawer="alternarMenu"
          />

          <!-- Panel principal -->
          <template v-if="seccionActiva === 'Inicio'">
            <WelcomeBanner />
            <SummaryCards />
            <QuickAccess @select-section="seleccionarSeccion" />
          </template>

          <!-- Módulos del sistema -->
          <ModulePlaceholder
            v-else
            :title="seccionActiva"
            :icon="iconoSeccion"
            @back-home="seccionActiva = 'Inicio'"
          />

          <!-- Pie de página -->
          <footer class="page-footer">Sistema de Tópico · Gestión de atención e inventario</footer>
        </main>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

import { useAuthStore } from '../stores/auth-store';

import DashboardSidebar from '../components/dashboard/DashboardSidebar.vue';
import DashboardHeader from '../components/dashboard/DashboardHeader.vue';
import WelcomeBanner from '../components/dashboard/WelcomeBanner.vue';
import SummaryCards from '../components/dashboard/SummaryCards.vue';
import QuickAccess from '../components/dashboard/QuickAccess.vue';
import ModulePlaceholder from '../components/dashboard/ModulePlaceholder.vue';

const router = useRouter();
const authStore = useAuthStore();
const $q = useQuasar();

const seccionActiva = ref('Inicio');

// En pantallas grandes comienza abierto; en móviles, cerrado.
const menuAbierto = ref($q.screen.width > 700);

function alternarMenu() {
  menuAbierto.value = !menuAbierto.value;
}

const nombreUsuario = computed(() => authStore.usuario?.nombres || 'Personal del tópico');

const iconos: Record<string, string> = {
  Inicio: 'dashboard',
  Personas: 'people',
  Atenciones: 'medical_services',
  Triaje: 'monitor_heart',
  Inventario: 'inventory_2',
  Campañas: 'campaign',
  Reportes: 'assessment',
};

const iconoSeccion = computed(() => iconos[seccionActiva.value] ?? 'dashboard');

function seleccionarSeccion(section: string) {
  seccionActiva.value = section;

  // En pantallas pequeñas, cerrar el menú después de seleccionar.
  if ($q.screen.width <= 700) {
    menuAbierto.value = false;
  }
}

function cerrarSesion() {
  authStore.logout();
  void router.replace('/login');
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: #f5f7fb;
}

.main-content {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 26px 30px;
}

.page-footer {
  padding-top: 30px;
  text-align: center;
  color: #8995a7;
  font-size: 11px;
}

@media (max-width: 700px) {
  .main-content {
    padding: 18px 14px;
  }
}
</style>
```
