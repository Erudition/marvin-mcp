# ---- Base Stage ----
FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

# ---- Dependencies Stage ----
FROM base AS dependencies
RUN npm install

# ---- Build Stage ----
FROM dependencies AS build
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM base AS production
ENV NODE_ENV=production
# Copy production node_modules
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# Copy built application
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/index.js" ]
