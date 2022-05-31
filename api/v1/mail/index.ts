import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import S from "fluent-json-schema";

export const name = "mail-v1";
export default async function (app: FastifyInstance, options: any) {
  app.route<{
    Body: {
      to: string;
      from: string;
      reply: string;
      message: string;
      message_html: string;
    };
  }>({
    method: "POST",
    url: "/",
    schema: {
      body: S.object()
        .prop("to", S.string().required())
        .prop("from", S.string().required())
        .prop("reply", S.string().required())
        .prop("message", S.string().required())
        .prop("message_html", S.string().required()),
      querystring: S.object(),
      params: S.object(),
      headers: S.object().prop(
        "content-type",
        S.const("application/json").required()
      ),
      response: {
        200: S.object(),
        400: S.object(),
        500: S.object(),
      },
    },
    handler: async function (request, reply) {
      const { from, to, reply: reply_to, message, message_html } = request.body;
      try {
        await app.mail.send({
          from,
          to,
          replyTo: reply_to,
          priority: "high",
          text: message,
          html: message_html,
        });
        reply.status(200).send({ status: "success" });
      } catch (error: any) {
        reply.status(500).send(error);
      }
    },
  });
}
