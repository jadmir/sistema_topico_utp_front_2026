<template>
  <section class="welcome-banner">
    <div>
      <div class="text-overline">PANEL DE CONTROL</div>

      <div class="text-h5 text-weight-bold q-mb-sm">¡Bienvenido al Sistema de Tópico!</div>

      <div class="welcome-description">
        Administra las atenciones, el inventario y las actividades del servicio desde un solo lugar.
      </div>
    </div>

    <q-icon name="medical_services" size="90px" class="welcome-icon" />
  </section>
</template>

<style scoped>
.welcome-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 30px;
  border-radius: 18px;
  color: white;
  background: linear-gradient(115deg, #1765d1, #3788e8);
}

.welcome-banner .text-overline {
  opacity: 0.8;
  letter-spacing: 1.4px;
  font-size: 10px;
}

.welcome-description {
  max-width: 520px;
  line-height: 1.6;
  color: #e8f1ff;
  font-size: 14px;
}

.welcome-icon {
  flex-shrink: 0;
  opacity: 0.25;
}

@media (max-width: 700px) {
  .welcome-banner {
    padding: 22px;
  }

  .welcome-icon {
    display: none;
  }
}
</style>
