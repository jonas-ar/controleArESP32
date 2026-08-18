# 🐳 Este projeto utiliza WSL2 com docker

> 💡 Use npm install para instalar as dependências do projeto

```bash
docker compose exec app npm install
```

## 🔥 Regras para liberação do Firewall para o Expo Metro

```powershell
New-NetFirewallHyperVRule `
  -Name "ExpoMetro8081" `
  -DisplayName "Expo Metro 8081" `
  -Direction Inbound `
  -VMCreatorId "{40E0AC32-46A5-438A-A0B2-2B479E8F2E90}" `
  -Protocol TCP `
  -LocalPorts 8081
```

O comando acima cria uma rule para HyperV Firewall do WSL.

```powershell
New-NetFirewallRule `
  -DisplayName "Expo Metro 8081" `
  -Direction Inbound `
  -Protocol TCP `
  -LocalPort 8081 `
  -Action Allow
```

O comando acima libera a mesma porta no firewall do Windows.

### 🗑️ Remoção das rules

```powershell
Remove-NetFirewallHyperVRule -Name "ExpoMetro8081"
```

```powershell
Remove-NetFirewallRule -DisplayName "Expo Metro 8081"
```

## 🤖 ESP32

O ESP32 foi configurado utilizando o sistema operacional FreeRTOS para gerenciamento das tarefas e suas prioridades. O core 0 fica responsável pelas conexões, enquanto que o core 1 realiza as tarefas de transmitir o sinal do LED IR após verificar as notificações de ligar/desligar.
