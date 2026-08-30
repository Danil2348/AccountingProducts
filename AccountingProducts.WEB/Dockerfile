# Базовый образ для запуска
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Образ для сборки
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Копируем и восстанавливаем зависимости
COPY ["AccountingProducts.WEB/AccountingProducts.WEB.csproj", "AccountingProducts.WEB/"]
COPY ["AccountingProducts.Domain/AccountingProducts.Domain.csproj", "AccountingProducts.Domain/"]
COPY ["AccountingProducts.Application/AccountingProducts.Application.csproj", "AccountingProducts.Application/"]
COPY ["AccountingProducts.Infrastructure/AccountingProducts.Infrastructure.csproj", "AccountingProducts.Infrastructure/"]

RUN dotnet restore "./AccountingProducts.WEB/AccountingProducts.WEB.csproj"

# Копируем весь код
COPY . .
WORKDIR "/src/AccountingProducts.WEB"
RUN dotnet build "./AccountingProducts.WEB.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Публикуем
FROM build AS publish
RUN dotnet publish "./AccountingProducts.WEB.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Финальный образ
FROM base AS final
WORKDIR /app

# Копируем собранное приложение
COPY --from=publish /app/publish .

# ✅ Запускаем приложение
ENTRYPOINT ["dotnet", "AccountingProducts.WEB.dll"]