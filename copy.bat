@echo off
@REM MinecraftPath: C:\Users\xxx\AppData\Roaming\Minecraft Bedrock\Users\Shared\games\com.mojang

rmdir /s /q "%MinecraftPath%\development_behavior_packs\GlobalCuisine_BP"
xcopy /I /Q /s /e ".\GlobalCuisine_BP" "%MinecraftPath%\development_behavior_packs\GlobalCuisine_BP"

rmdir /s /q "%MinecraftPath%\development_resource_packs\GlobalCuisine_RP"
xcopy /I /Q /s /e ".\GlobalCuisine_RP" "%MinecraftPath%\development_resource_packs\GlobalCuisine_RP"
