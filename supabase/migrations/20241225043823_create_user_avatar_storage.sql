INSERT INTO storage.buckets (id, name, public)
VALUES ('users', 'users', true);

CREATE POLICY "Allow File Retrieval from Other's Folder For Users Bucket"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (
    bucket_id = 'users'
    );

CREATE POLICY "Allow File from Own Folder For Users Bucket"
    ON storage.objects FOR ALL
    TO authenticated
    USING (
    bucket_id = 'users' AND
    (SELECT auth.uid()::TEXT) = (storage.foldername(name))[1]
    )
    WITH CHECK (
    bucket_id = 'users' AND
    (SELECT auth.uid()::TEXT) = (storage.foldername(name))[1]
    );
