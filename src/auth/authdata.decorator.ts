import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { AuthType } from "./auth.type";

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as AuthType;
    },
);