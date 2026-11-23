<template>
  <section class="module-placeholder">
    <q-card flat bordered class="placeholder-card">
      <q-avatar color="blue-1" text-color="primary" size="76px">
        <q-icon :name="icon" size="40px" />
      </q-avatar>

      <div class="text-h5 text-weight-bold q-mt-lg">Módulo de {{ title }}</div>

      <div class="text-body1 text-grey-7 q-mt-sm">
        La navegación está preparada. Este módulo todavía debe conectarse con el backend NestJS.
      </div>

      <q-btn
        color="primary"
        unelevated
        icon="arrow_back"
        label="Volver al inicio"
        class="q-mt-lg"
        @click="$emit('back-home')"
      />
    </q-card>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
}>();

defineEmits<{
  'back-home': [];
}>();
</script>

<style scoped>
.module-placeholder {
  display: flex;
  justify-content: center;
  padding: 50px 0;
}

.placeholder-card {
  width: 100%;
  max-width: 600px;
  padding: 40px;
  text-align: center;
  border-radius: 18px;
  background: white;
}

@media (max-width: 700px) {
  .placeholder-card {
    padding: 24px;
  }
}
</style>
