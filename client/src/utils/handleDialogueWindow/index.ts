import { ref } from 'vue';

export function createDialogVisibility() {
  const dialogVisible = ref(false);

  function setDialogVisible(ifVisible: boolean) {
    dialogVisible.value = ifVisible;
  }

  return { dialogVisible, setDialogVisible };
}