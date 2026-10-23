param([string]$ToolRoot='E:\GPTDOCX\android-tools')
$ErrorActionPreference='Stop'
$jdk=Get-ChildItem -LiteralPath (Join-Path $ToolRoot 'jdk') -Directory | Select-Object -First 1
if(-not $jdk){throw 'JDK 21 not found. Set ToolRoot to the prepared build tools folder.'}
$env:JAVA_HOME=$jdk.FullName
$env:ANDROID_HOME=Join-Path $ToolRoot 'sdk'
$env:ANDROID_USER_HOME=Join-Path $ToolRoot 'android-user'
$env:GRADLE_USER_HOME=Join-Path $ToolRoot 'gradle-cache'
$env:TEMP=Join-Path $ToolRoot 'temp';$env:TMP=$env:TEMP
New-Item -ItemType Directory -Force $env:TEMP | Out-Null
Set-Location $PSScriptRoot
& npm.cmd run android:sync
if($LASTEXITCODE -ne 0){throw 'Web build or Android sync failed.'}
$sdkPath=$env:ANDROID_HOME.Replace('\','/')
[IO.File]::WriteAllText((Join-Path $PSScriptRoot 'android/local.properties'),"sdk.dir=$sdkPath`n",[Text.Encoding]::ASCII)
Set-Location (Join-Path $PSScriptRoot 'android')
$localGradle=Join-Path $ToolRoot 'gradle-8.14.3/bin/gradle.bat'
if(Test-Path -LiteralPath $localGradle){& $localGradle :app:assembleDebug --no-daemon --console=plain}else{& .\gradlew.bat :app:assembleDebug --no-daemon --console=plain}
if($LASTEXITCODE -ne 0){throw 'Android build failed.'}
Write-Host 'APK: android/app/build/outputs/apk/debug/app-debug.apk'
