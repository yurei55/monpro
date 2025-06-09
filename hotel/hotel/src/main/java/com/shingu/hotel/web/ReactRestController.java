package com.shingu.hotel.web;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.List; // ✅ 누락된 import 추가

@RestController
public class ReactRestController {

    @PostMapping(value="/testData")
    public Map<Integer, String> testData(@RequestBody List<String> params){
        Map<Integer, String> data = new HashMap<>();
        data.put(1,"사과");
        data.put(2,"포도");
        data.put(3,"바나나");

        int i = 4;
        for(String param : params){
            data.put(i, param);
            i++;
        }

        return data;
    }
}