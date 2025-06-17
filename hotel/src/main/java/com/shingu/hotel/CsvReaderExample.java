package com.shingu.hotel;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class CsvReaderExample {
    public static void main(String[] args) {
        // 클래스패스 기준으로 리소스 가져오기
        InputStream inputStream = CsvReaderExample.class.getClassLoader().getResourceAsStream("hotel_20230405.csv");

        if (inputStream == null) {
            System.out.println("파일을 찾을 수 없습니다.");
            return;
        }

        // 인코딩 명시해서 UTF-8로 읽기
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] values = line.split(",");
                for (String value : values) {
                    System.out.print(value.trim() + " ");
                }
                System.out.println();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
