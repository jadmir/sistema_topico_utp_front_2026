<template>
  <q-card flat bordered class="summary-card">
    <q-card-section>
      <div class="row items-start justify-between">
        <div>
          <div class="text-body2 text-grey-7">
            {{ title }}
          </div>

          <div class="text-h4 text-weight-bold q-mt-sm">
            {{ value }}
          </div>
        </div>

        <q-avatar :color="color" :text-color="textColor" size="48px">
          <q-icon :name="icon" size="26px" />
        </q-avatar>
      </div>

      <div class="text-caption text-grey-7 q-mt-md">
        {{ description }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    value: string | number;
    description: string;
    icon: string;
    color?: string;
    textColor?: string;
  }>(),
  {
    color: 'blue-1',
    textColor: 'blue-9',
  },
);
</script>

<style scoped>
.summary-card {
  height: 100%;
  border-radius: 14px;
  background: white;
}
</style>
