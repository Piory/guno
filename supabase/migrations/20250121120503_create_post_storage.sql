INSERT INTO storage.buckets (id, name, public)
VALUES ('posts', 'posts', true);

CREATE POLICY "Allow File Retrieval from Other's Folder For Posts Bucket"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (
    bucket_id = 'posts'
    );

CREATE POLICY "Allow File from Own Folder For Posts Bucket"
    ON storage.objects FOR ALL
    TO authenticated
    USING (
    bucket_id = 'posts'
    )
    WITH CHECK (
    bucket_id = 'posts'
    );
