<template>
    <div class="fixed top-[64px] px-60 py-20 z-50 h-[100vh] w-[100vw] bg-red-100 halfDarkBg overflow-auto ">
        <h1 class="text-2xl mb-4">Public profile</h1>
        <hr class="border-t border-gray-500 my-1 w-full">
        <div class="flex">
            <div class="flex flex-col gap-5 w-[60%] p-4">
                <div>
                    <p>Name</p>
                    <el-input class="profile" />
                    <p class="text-xs">Your name may appear around GitHub where you contribute or are mentioned. You can
                        remove it at any time</p>
                </div>
                <div>
                    <p>E-mail</p>
                    <el-input class="profile" />
                    <p class="text-xs">You have set your email address to private. To toggle email privacy, go to email
                        settings and uncheck "Keep my email address private."</p>
                </div>
                <div>
                    <p>Bio</p>
                    <el-input class="profile bio" />
                    <p class="text-xs">You can @mention other users and organizations to link to them.</p>
                </div>
                <div>
                    <p>Bio</p>
                    <el-input class="profile bio" />
                    <p class="text-xs">You can @mention other users and organizations to link to them.</p>
                </div>
                <div>
                    <p>Bio</p>
                    <el-input class="profile bio" />
                    <p class="text-xs">You can @mention other users and organizations to link to them.</p>
                </div>
                <div>
                    <p>Bio</p>
                    <el-input class="profile bio" />
                    <p class="text-xs">You can @mention other users and organizations to link to them.</p>
                </div>
            </div>
            
            <div class="w-[40%] p-4">
                <h1 class="text-2xl mb-4">Profile Picture</h1>
                 <el-image class="rounded-full w-[200px] h-[200px]" :src=" 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'" lazy/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
<style>
.el-input.profile {
    margin-top: 4px;
    width: 280px;
}

.el-input.bio {
    height: 150px;
}
</style>