package com.hawaiki.cucumber.stepdefs;

import com.hawaiki.GatewayServiceApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = GatewayServiceApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
