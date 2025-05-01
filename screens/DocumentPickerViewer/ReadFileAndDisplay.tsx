import React, { useState } from 'react';
import { Button, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { saveDocuments, pick, keepLocalCopy } from '@react-native-documents/picker';
import Toast from 'react-native-toast-message';
import { viewDocument } from '@react-native-documents/viewer';
import { useCallback } from 'react';

type DocumentType = {
  uri: string;
  name: string;
  bookmark?: string;
};

export const ReadFileAndDisplay = () => {
  const [lastDocument, setLastDocument] = useState<DocumentType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewerVisible, setViewerVisible] = useState(false);

  const showToast = useCallback((type: 'success' | 'error', message: string) => {
    Toast.show({
      type,
      text1: type === 'success' ? 'Success' : 'Error',
      text2: message,
      visibilityTime: 2000,
    });
  }, []);

  const handleError = useCallback(
    (error: unknown) => {
      console.error('Error:', error);
      if (error instanceof Error && error.message.includes('cancel')) {
        // Don't show toast for user cancellation
        return;
      }
      showToast('error', error instanceof Error ? error.message : 'Failed to handle document');
    },
    [showToast]
  );

  const handleDocumentPick = useCallback(async () => {
    try {
      setIsLoading(true);
      const results = await pick({
        allowMultiSelection: false,
        copyTo: 'documentDirectory',
        fileTypes: ['public.item'], // Specify allowed file types
      });

      if (results.length === 0) {
        // User canceled the picker
        return;
      }

      const [pickResult] = results as unknown as [{ uri: string; name: string }];
      
      // Save document reference permanently
      const saveResult = await saveDocuments({
        sourceUris: [pickResult.uri],
        fileName: pickResult.name,
        copy: true // Assuming you want to always keep a local copy
      });

      const document = {
        uri: pickResult.uri,
        name: pickResult.name,
        bookmark: saveResult[0]?.uri // Adjusted to use 'uri' or another valid property
      };

      setLastDocument(document);
      
      // Open document viewer
      setViewerVisible(true);
      await viewDocument({ bookmark: document.bookmark });
      setViewerVisible(false);
      
      showToast('success', `${document.name} displayed successfully`);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [handleError, showToast]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Button
            title={lastDocument ? `View ${lastDocument.name}` : 'Pick and Display File'}
            onPress={handleDocumentPick}
            disabled={viewerVisible}
            color="#007AFF"
            accessibilityLabel="Select and view a document"
          />
        )}
      </View>

      {lastDocument && (
        <Text style={styles.fileInfo} numberOfLines={1} ellipsizeMode="middle">
          Selected file: {lastDocument.name}
        </Text>
      )}

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  buttonContainer: {
    marginVertical: 16,
    minWidth: 240,
    height: 48,
    justifyContent: 'center',
  },
  fileInfo: {
    marginTop: 12,
    fontSize: 14,
    color: '#6c757d',
    maxWidth: '80%',
  },
});