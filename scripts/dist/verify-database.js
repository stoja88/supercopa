"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var userCount, familyCount, messageCount, eventCount, documentCount, expenseCount, users, adminUsers, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, 10, 12]);
                    console.log('Verificando conexión a la base de datos...');
                    // Verificar la conexión ejecutando una consulta simple
                    return [4 /*yield*/, prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT 1"], ["SELECT 1"])))];
                case 1:
                    // Verificar la conexión ejecutando una consulta simple
                    _a.sent();
                    console.log('✅ Conexión a la base de datos establecida correctamente');
                    // Obtener estadísticas de la base de datos
                    console.log('\n📊 Estadísticas de la base de datos:');
                    return [4 /*yield*/, prisma.user.count()];
                case 2:
                    userCount = _a.sent();
                    console.log("- Usuarios registrados: ".concat(userCount));
                    return [4 /*yield*/, prisma.family.count()];
                case 3:
                    familyCount = _a.sent();
                    console.log("- Familias creadas: ".concat(familyCount));
                    return [4 /*yield*/, prisma.message.count()];
                case 4:
                    messageCount = _a.sent();
                    console.log("- Mensajes enviados: ".concat(messageCount));
                    return [4 /*yield*/, prisma.event.count()];
                case 5:
                    eventCount = _a.sent();
                    console.log("- Eventos programados: ".concat(eventCount));
                    return [4 /*yield*/, prisma.document.count()];
                case 6:
                    documentCount = _a.sent();
                    console.log("- Documentos subidos: ".concat(documentCount));
                    return [4 /*yield*/, prisma.expense.count()];
                case 7:
                    expenseCount = _a.sent();
                    console.log("- Gastos registrados: ".concat(expenseCount));
                    // Listar usuarios
                    console.log('\n👥 Lista de usuarios registrados:');
                    return [4 /*yield*/, prisma.user.findMany({
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                role: true,
                                createdAt: true,
                            },
                            orderBy: {
                                createdAt: 'desc',
                            },
                        })];
                case 8:
                    users = _a.sent();
                    if (users.length === 0) {
                        console.log('No hay usuarios registrados en la base de datos.');
                    }
                    else {
                        users.forEach(function (user, index) {
                            console.log("\nUsuario #".concat(index + 1, ":"));
                            console.log("- ID: ".concat(user.id));
                            console.log("- Nombre: ".concat(user.name || 'No especificado'));
                            console.log("- Email: ".concat(user.email));
                            console.log("- Rol: ".concat(user.role));
                            console.log("- Fecha de registro: ".concat(user.createdAt.toLocaleString()));
                        });
                    }
                    adminUsers = users.filter(function (user) { return user.role === 'ADMIN'; });
                    if (adminUsers.length === 0) {
                        console.log('\n⚠️ No hay usuarios con rol de administrador.');
                        console.log('Ejecuta el script create-superadmin.ts para crear un usuario administrador.');
                    }
                    else {
                        console.log("\n\u2705 Se encontraron ".concat(adminUsers.length, " usuarios con rol de administrador."));
                    }
                    return [3 /*break*/, 12];
                case 9:
                    error_1 = _a.sent();
                    console.error('❌ Error al conectar con la base de datos:', error_1);
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, prisma.$disconnect()];
                case 11:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
main();
var templateObject_1;
