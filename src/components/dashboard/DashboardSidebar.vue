```vue
<template>
  <q-drawer
    :model-value="modelValue"
    side="left"
    bordered
    :width="255"
    :breakpoint="700"
    behavior="default"
    class="sidebar-drawer"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="sidebar">
      <!-- Identidad del sistema -->
      <div class="brand">
        <q-avatar color="primary" text-color="white" size="44px">
          <q-icon name="medical_services" size="26px" />
        </q-avatar>

        <div>
          <div class="brand-title">Sistema de Tópico</div>
          <div class="brand-subtitle">Panel administrativo</div>
        </div>
      </div>

      <div class="menu-label">MENÚ PRINCIPAL</div>

      <!-- Opciones del menú -->
      <q-list class="menu-list">
        <q-item
          v-for="item in menuItems"
          :key="item.label"
          clickable
          v-ripple
          :active="activeSection === item.label"
          active-class="menu-active"
          class="menu-item"
          @click="handleSelect(item.label)"
        >
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            {{ item.label }}
          </q-item-section>
        </q-item>
      </q-list>

      <!-- Pie del menú -->
      <div class="sidebar-footer">
        <q-icon name="verified_user" size="20px" />
        <span>Sistema interno</span>
      </div>
    </div>
  </q-drawer>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

defineProps<{
  activeSection: string;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'select-section': [section: string];
  'update:modelValue': [value: boolean];
}>();

const $q = useQuasar();

const menuItems = [
  { label: 'Inicio', icon: 'dashboard' },
  { label: 'Personas', icon: 'people' },
  { label: 'Atenciones', icon: 'medical_services' },
  { label: 'Triaje', icon: 'monitor_heart' },
  { label: 'Inventario', icon: 'inventory_2' },
  { label: 'Campañas', icon: 'campaign' },
  { label: 'Reportes', icon: 'assessment' },
];

function handleSelect(section: string) {
  emit('select-section', section);

  // Cerrar el menú después de seleccionar una opción en móvil.
  if ($q.screen.width <= 700) {
    emit('update:modelValue', false);
  }
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  padding: 24px 16px;
  background: #fff;
  box-sizing: border-box;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px 28px;
}

.brand-title {
  font-size: 15px;
  font-weight: 700;
  color: #24334a;
}

.brand-subtitle {
  margin-top: 3px;
  font-size: 11px;
  color: #78869a;
}

.menu-label {
  padding: 8px 12px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.1px;
  color: #8995a7;
}

.menu-list {
  flex: 1;
}

.menu-item {
  min-height: 46px;
  margin: 4px 0;
  border-radius: 10px;
  color: #58677d;
}

.menu-active {
  background: #eaf2ff;
  color: #1765d1;
  font-weight: 600;
}

.sidebar-footer {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 18px 10px 0;
  border-top: 1px solid #edf0f5;
  color: #758398;
  font-size: 12px;
}
</style>
