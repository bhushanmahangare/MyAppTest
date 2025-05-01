import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { saveDocuments, pick, types, keepLocalCopy } from '@react-native-documents/picker';
import invariant from 'invariant';
import Toast from 'react-native-toast-message';

export const DocumentPickerViewer = () => {
    const showToast = (type: 'success' | 'error', message: string) => {
        Toast.show({
            type,
            text1: type === 'success' ? 'Success' : 'Error',
            text2: message,
        });
    };

    return (
        <View style={styles.container}>
            <Button
                title="Save some text file to a user-defined location"
                onPress={async () => {
                    try {
                        const [{ uri: targetUri }] = await saveDocuments({
                            sourceUris: ['some file uri'],
                            copy: false,
                            mimeType: 'text/plain',
                            fileName: 'some file name',
                        });
                        console.log('File saved to:', targetUri);
                        showToast('success', `File saved to: ${targetUri}`);
                    } catch (error) {
                        console.error('Error saving document:', error);
                        showToast('error', 'Error saving document');
                    }
                }}
            />
            <Button
                title="Single file import"
                onPress={async () => {
                    try {
                        const [pickResult] = await pick();
                        console.log('Picked file:', pickResult);
                        showToast('success', 'File imported successfully');
                    } catch (err: unknown) {
                        console.error('Error picking document:', err);
                        showToast('error', 'Error picking document');
                    }
                }}
            />
            <Button
                title="Open PDF file with requestLongTermAccess: true"
                onPress={async () => {
                    try {
                        const [result] = await pick({
                            mode: 'open',
                            requestLongTermAccess: true,
                            type: [types.pdf],
                        });
                        if (result.bookmarkStatus === 'success') {
                            const bookmarkToStore = {
                                fileName: result.name ?? 'unknown name',
                                bookmark: result.bookmark,
                            };
                            localStorage.setItem('bookmark', JSON.stringify(bookmarkToStore));
                            showToast('success', 'PDF file opened successfully');
                        } else {
                            console.error(result);
                            showToast('error', 'Failed to open PDF file');
                        }
                    } catch (err) {
                        console.error('Error opening PDF file:', err);
                        showToast('error', 'Error opening PDF file');
                    }
                }}
            />
            <Button
                title="import virtual file (such as a document from GDrive)"
                onPress={async () => {
                    try {
                        const [file] = await pick({
                            allowVirtualFiles: true,
                        });
                        const { name, uri: pickedUri, convertibleToMimeTypes } = file;

                        const virtualFileMeta = convertibleToMimeTypes && convertibleToMimeTypes[0];
                        invariant(name && virtualFileMeta, 'name and virtualFileMeta is required');
                        const [copyResult] = await keepLocalCopy({
                            files: [
                                {
                                    uri: pickedUri,
                                    fileName: `${name}.${virtualFileMeta.extension ?? ''}`,
                                    convertVirtualFileToType: virtualFileMeta.mimeType,
                                },
                            ],
                            destination: 'cachesDirectory',
                        });
                        if (copyResult.status === 'success') {
                            const localCopy = copyResult.localUri;
                            console.log('Local copy created at:', localCopy);
                            showToast('success', `Local copy created at: ${localCopy}`);
                        }
                    } catch (error) {
                        console.error('Error importing virtual file:', error);
                        showToast('error', 'Error importing virtual file');
                    }
                }}
            />
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    button: {
        marginVertical: 8,
    },
});
