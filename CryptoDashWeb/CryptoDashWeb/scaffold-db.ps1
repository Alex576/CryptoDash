$conn = "Server=DESKTOP-ALIM42N;Database=Isunaki;Trusted_Connection=True;TrustServerCertificate=True;"
$provider = "Microsoft.EntityFrameworkCore.SqlServer"

# 2. Генерируем модуль Security (схема sc)
Write-Host "Scaffolding Security..." -ForegroundColor Cyan
dotnet ef dbcontext scaffold $conn $provider `
    --project ..\Security.Data\Security.Data.csproj `
    --startup-project ..\Security.Data\ `
    --schema sc `
    --context SecurityContext `
    --output-dir DBModels `
    --context-dir DBContext `
    --no-onconfiguring `
    --force

# 3. Генерируем модуль Isunaki (схема dbo)
Write-Host "Scaffolding Isunaki..." -ForegroundColor Cyan
dotnet ef dbcontext scaffold $conn $provider `
    --project ..\Isunaki.Data\Isunaki.Data.csproj `
    --startup-project ..\Isunaki.Data\ `
    --schema dbo `
    --context IsunakiContext `
    --output-dir DBModels `
    --context-dir DBContext `
    --no-onconfiguring `
    --force

Write-Host "Done!" -ForegroundColor Green
