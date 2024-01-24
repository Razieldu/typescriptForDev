<template>
    <div class="flex justify-center align-center absolute right-5">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                <div class="flex justify-center align-center">
                    <el-avatar :src="photo" />
                </div>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <div class="flex justify-center align-center">
                        <router-link to="/profile"><el-dropdown-item :icon="User">
                                {{ $t("basic.top.profilePage")
                                }}
                            </el-dropdown-item>
                        </router-link>
                    </div>
                    <div class="flex justify-center align-center">
                        <router-link to="/"><el-dropdown-item :icon="Files">
                                {{ $t("basic.top.dataPage") }}
                            </el-dropdown-item>
                        </router-link>
                    </div>
                    <div class="flex justify-center align-center">
                        <el-dropdown-item @click="handleLogOut" :icon="SwitchButton">
                            {{ $t("basic.top.logout") }}
                        </el-dropdown-item>
                    </div>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script lang="ts" setup>
import { handleLogOut } from "@/utils"
import {
    // Check,
    // CircleCheck,
    // CirclePlus,
    // CirclePlusFilled,
    // Plus,
    Files,
    User,
    SwitchButton
} from '@element-plus/icons-vue'
import { useUserDataStore } from "@/store";
const { isLogin } = useUserDataStore()
const photo = isLogin?.photoURL || "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"

</script>