package org.sonar.application;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class WebHook {

    // This method will be used to send the HTTP request. We will test it without actually sending requests.
    public int sendHttpRequest(String webhookUrl, String jsonPayload) throws Exception {
        URL url = new URL(webhookUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        try (OutputStream os = connection.getOutputStream()) {
            os.write(jsonPayload.getBytes());
            os.flush();
        }

        return connection.getResponseCode(); // Return response code for testing
    }

    public void sendHook() {
        String webhookUrl = "https://discord.com/api/webhooks/1338712267306569729/kbqhXPRxF7cfmY3_oXDND3ldy49jOWFLYH8bEfDHpfmMDte980OvaMMq6A2yz0vlqRAc";
        String jsonPayload = "{\"content\": \"Hello from SonarQube!\"}";

        try {
            int responseCode = sendHttpRequest(webhookUrl, jsonPayload);
            System.out.println("Response Code: " + responseCode);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}