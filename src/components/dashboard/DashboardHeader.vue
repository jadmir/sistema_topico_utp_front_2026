<template>
  <header class="topbar">
    <div class="row items-center no-wrap q-gutter-sm">
      <q-btn
        flat
        round
        dense
        icon="menu"
        color="primary"
        aria-label="Mostrar u ocultar menú"
        @click="$emit('toggle-drawer')"
      >
        <q-tooltip>Mostrar u ocultar menú</q-tooltip>
      </q-btn>

      <div>
        <div class="text-caption text-grey-7">Sistema de Tópico / {{ section }}</div>

        <div class="text-h5 text-weight-bold">
          {{ section === 'Inicio' ? 'Panel principal' : section }}
        </div>
      </div>
    </div>

    <div class="row items-center q-gutter-sm">
      <q-avatar color="blue-1" text-color="primary" size="42px">
        <q-icon name="person" size="24px" />
      </q-avatar>

      <div class="user-info">
        <div class="text-weight-medium">
          {{ userName || 'Personal del tópico' }}
        </div>

        <div class="text-caption text-grey-7">
          {{ userEmail || 'Usuario autenticado' }}
        </div>
      </div>

      <q-btn
        flat
        round
        color="negative"
        icon="logout"
        aria-label="Cerrar sesión"
        @click="$emit('logout')"
      >
        <q-tooltip>Cerrar sesión</q-tooltip>
      </q-btn>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  section: string;
  userName?: string;
  userEmail?: string;
}>();

defineEmits<{
  'toggle-drawer': [];
  logout: [];
}>();
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: #f5f7fb;
  box-shadow: 0 8px 18px rgba(36, 51, 74, 0.12);
  border-radius: 12px;
  margin-bottom: 28px;
}

.user-info {
  max-width: 190px;
  overflow-wrap: anywhere;
}

@media (max-width: 700px) {
  .topbar {
    align-items: flex-start;
  }

  .user-info {
    display: none;
  }
}
</style>
