```vue
<template>
  <section>
    <div class="section-heading">
      <div class="text-h6 text-weight-bold">Resumen del sistema</div>

      <div class="text-caption text-grey-7">Indicadores de los módulos</div>
    </div>

    <!-- Cargando datos -->
    <div v-if="cargando" class="loading-state">
      <q-spinner color="primary" size="32px" />
      <div class="text-grey-7 q-mt-sm">Cargando indicadores...</div>
    </div>

    <!-- Error de conexión -->
    <q-banner v-else-if="error" class="bg-red-1 text-negative rounded-borders q-mb-md">
      <template #avatar>
        <q-icon name="error_outline" />
      </template>

      {{ error }}

      <template #action>
        <q-btn flat color="negative" label="Reintentar" @click="cargarResumen" />
      </template>
    </q-banner>

    <!-- Tarjetas -->
    <div v-else class="summary-grid">
      <SummaryCard
        v-for="card in cards"
        :key="card.title"
        :title="card.title"
        :value="formatearNumero(card.value)"
        :description="card.description"
        :icon="card.icon"
        :color="card.color"
        :text-color="card.textColor"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '../../services/api';
import SummaryCard from './SummaryCard.vue';

interface ResumenDashboard {
  personasRegistradas: number;
  atencionesDelMes: number;
  productosRegistrados: number;
  lotesPorVencer: number;
}

interface Tarjeta {
  title: string;
  value: number;
  description: string;
  icon: string;
  color: string;
  textColor: string;
}

const cargando = ref(true);
const error = ref('');

const resumen = ref<ResumenDashboard>({
  personasRegistradas: 0,
  atencionesDelMes: 0,
  productosRegistrados: 0,
  lotesPorVencer: 0,
});

const cards = ref<Tarjeta[]>([]);

function formatearNumero(valor: number): string {
  return new Intl.NumberFormat('es-PE').format(valor);
}

function actualizarTarjetas() {
  cards.value = [
    {
      title: 'Personas',
      value: resumen.value.personasRegistradas,
      description: 'Personas registradas',
      icon: 'people',
      color: 'blue-1',
      textColor: 'blue-9',
    },
    {
      title: 'Atenciones',
      value: resumen.value.atencionesDelMes,
      description: 'Atenciones del mes actual',
      icon: 'medical_services',
      color: 'green-1',
      textColor: 'green-9',
    },
    {
      title: 'Productos',
      value: resumen.value.productosRegistrados,
      description: 'Productos del inventario',
      icon: 'inventory_2',
      color: 'orange-1',
      textColor: 'deep-orange-9',
    },
    {
      title: 'Por vencer',
      value: resumen.value.lotesPorVencer,
      description: 'Lotes que vencen en 90 días',
      icon: 'event_busy',
      color: 'purple-1',
      textColor: 'purple-9',
    },
  ];
}

async function cargarResumen() {
  cargando.value = true;
  error.value = '';

  try {
    const respuesta = await api.get<ResumenDashboard>('/reportes/dashboard');

    resumen.value = respuesta.data;
    actualizarTarjetas();
  } catch (err: unknown) {
    console.error('Error al cargar el resumen del dashboard:', err);

    error.value =
      'No se pudieron cargar los indicadores. Verifica tu conexión y tus permisos e inténtalo nuevamente.';
  } finally {
    cargando.value = false;
  }
}

onMounted(() => {
  void cargarResumen();
});
</script>

<style scoped>
.section-heading {
  margin: 26px 0 16px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}

@media (max-width: 1100px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```
