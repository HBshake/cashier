FROM rust:1.78-bookworm

RUN cargo install sqlx-cli

COPY --chmod=0755 ./scripts/backend.sh /run.sh
EXPOSE 8000
ENTRYPOINT [ "/run.sh" ]