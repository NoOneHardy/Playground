package ch.noonehardy;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.Scanner;

import org.apache.commons.codec.digest.DigestUtils;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        for (int i = 0; i < 10; i++) {
            System.out.print("Welches Wort möchten Sie hashen?: ");
            String word = scanner.nextLine();
            String hash = DigestUtils.sha256Hex(word);

            System.out.println(hash);
            System.out.println();
            System.out.println("----------");
            System.out.println();
        }
    }
}
