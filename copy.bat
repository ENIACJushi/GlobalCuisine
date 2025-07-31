@echo off
@REM MinecraftPath: C:\Users\XXX\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe

rmdir /s /q "%MinecraftPath%\LocalState\games\com.mojang\development_behavior_packs\GlobalCuisine_BP"
xcopy /I /Q /s /e ".\RideablePolarBearBP" "%MinecraftPath%\LocalState\games\com.mojang\development_behavior_packs\GlobalCuisine_BP"

rmdir /s /q "%MinecraftPath%\LocalState\games\com.mojang\development_resource_packs\GlobalCuisine_RP"
xcopy /I /Q /s /e ".\RideablePolarBearRP" "%MinecraftPath%\LocalState\games\com.mojang\development_resource_packs\GlobalCuisine_RP"
