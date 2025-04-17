CREATE SEQUENCE snowflake_sequence;

CREATE OR REPLACE FUNCTION generate_snowflake_id()
    RETURNS BIGINT AS
$$
DECLARE
    epoch      BIGINT := 1735689600000; -- 2025-01-01 00:00:00 UTC
    machine_id INT    := 1;
    timestamp  BIGINT;
    sequence   INT;
BEGIN
    SELECT EXTRACT(EPOCH FROM clock_timestamp()) * 1000 INTO timestamp;
    timestamp := timestamp - epoch;

    -- シーケンス管理
    SELECT nextval('snowflake_sequence') % 4096 INTO sequence;

    -- Snowflake ID の生成
    RETURN (timestamp << 22) | (machine_id << 12) | sequence;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION generate_snowflake_id IS 'Snowflake ID 生成';

CREATE OR REPLACE FUNCTION generate_snowflake_id()
    RETURNS BIGINT AS
$$
DECLARE
    epoch      BIGINT := 1735689600000; -- 2025-01-01
    machine_id INT    := current_setting('custom.machine_id')::INT;
    timestamp  BIGINT;
    sequence   INT;
BEGIN
    SELECT (EXTRACT(EPOCH FROM clock_timestamp()) * 1000)::BIGINT INTO timestamp;
    timestamp := timestamp - epoch;

    SELECT nextval('snowflake_sequence') % 4096 INTO sequence;

    RETURN (timestamp << 22) | (machine_id << 12) | sequence;
END;
$$ LANGUAGE plpgsql;
