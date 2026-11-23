<template>
  <section>
    <div class="section-heading">
      <div class="text-h6 text-weight-bold">Accesos rápidos</div>

      <div class="text-caption text-grey-7">Selecciona un módulo para continuar</div>
    </div>

    <div class="quick-grid">
      <q-card
        v-for="item in items"
        :key="item.label"
        flat
        bordered
        class="quick-card cursor-pointer"
        @click="$emit('select-section', item.label)"
      >
        <q-card-section class="row items-center no-wrap q-gutter-md">
          <q-avatar :color="item.color" :text-color="item.textColor" size="46px" rounded>
            <q-icon :name="item.icon" size="25px" />
          </q-avatar>

          <div class="col">
            <div class="text-weight-bold">
              {{ item.label }}
            </div>

            <div class="text-caption text-grey-7">
              {{ item.description }}
            </div>
          </div>

          <q-icon name="chevron_right" color="grey-6" />
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits<{
  'select-section': [section: string];
}>();

const items = [
  {
    label: 'Personas',
    description: 'Consultar y registrar personas',
    icon: 'people',
    color: 'blue-1',
    textColor: 'blue-9',
  },
  {
    label: 'Atenciones',
    description: 'Gestionar las atenciones',
    icon: 'medical_services',
    color: 'green-1',
    textColor: 'green-9',
  },
  {
    label: 'Inventario',
    description: 'Consultar productos y existencias',
    icon: 'inventory_2',
    color: 'orange-1',
    textColor: 'deep-orange-9',
  },
  {
    label: 'Reportes',
    description: 'Consultar y exportar reportes',
    icon: 'assessment',
    color: 'purple-1',
    textColor: 'purple-9',
  },
];
</script>

<style scoped>
.section-heading {
  margin: 26px 0 16px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.quick-card {
  border-radius: 13px;
  background: white;
  transition: box-shadow 0.2s ease;
}

.quick-card:hover {
  box-shadow: 0 5px 18px rgb(25 50 85 / 8%);
}

@media (max-width: 700px) {
  .quick-grid {
    grid-template-columns: 1fr;
  }
}
</style>
