package com.algo_rivals.AlgoRivals.room.controller;

import com.algo_rivals.AlgoRivals.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {

    private final RoomService roomService;



}
