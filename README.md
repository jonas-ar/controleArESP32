# Este projeto utiliza WSL2 com docker
Use npm install para instalar as dependências do projeto
```
docker compose exec app npm install novo-pacote
````
## Regras para liberação do Firewall para o Expo Metro
```
New-NetFirewallHyperVRule `
  -Name "ExpoMetro8081" `
  -DisplayName "Expo Metro 8081" `
  -Direction Inbound `
  -VMCreatorId "{40E0AC32-46A5-438A-A0B2-2B479E8F2E90}" `
  -Protocol TCP `
  -LocalPorts 8081
  ```
  O comando acima cria uma rule para HyperV Firewall do WSL.

  ```
  New-NetFirewallRule `
  -DisplayName "Expo Metro 8081" `
  -Direction Inbound `
  -Protocol TCP `
  -LocalPort 8081 `
  -Action Allow
  ```
O comando acima libera a mesma porta no firewall do Windows.

### Remoção das rules
```
Remove-NetFirewallHyperVRule -Name "ExpoMetro8081"
```

```
Remove-NetFirewallRule -DisplayName "Expo Metro 8081"
```
