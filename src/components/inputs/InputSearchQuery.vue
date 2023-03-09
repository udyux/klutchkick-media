<template>
  <label class="input-search" :class="className">
    <Icon v-if="!searchTerm.length" name="search" class="input-search__icon" />
    <button v-else class="input-search__icon -clear" @click.stop="searchTerm = ''">&times;</button>

    <input
      v-model.trim="searchTerm"
      type="search"
      class="input-search__field"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </label>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuery } from '@/modules';
import { Icon } from '@/components';

const { query, updateQueryKey } = useQuery();
const isFocused = ref(false);
const className = computed(() => ({ '-filled': !!searchTerm.value.length, '-focus': isFocused.value }));

const searchTerm = computed({
  get: () => (query.value.search as string) || '',
  set: value => updateQueryKey('search', value, !value.length),
});
</script>
