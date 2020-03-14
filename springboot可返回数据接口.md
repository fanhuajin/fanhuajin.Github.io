### springboot可返回数据接口

#### 1.导包

在pom.xml中导包

```java
<!--Lombok-->
    <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
    <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.12</version>
    <scope>provided</scope>
</dependency>

<!--fastjson-->
<!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.66</version>
</dependency>
```

#### 2.解决跨域问题

java下的com.fan下创建config目录并创建CorsFilter类解决跨域问题

```java
package com.fan.config;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 跨域的配置，必须这么做，原因是，shiro 的拦截器优先级在 CorsFilter 之前
 */
@Component
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since, x-token, token");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.addHeader("Access-Control-Allow-Credentials", "true");

        filterChain.doFilter(request, response);
    }

}

```

#### 3.创建数据返回格式类

创建数据返回格式类ResultSets，前端需要什么给什么

```java
package com.fan.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultSets {
    private String code;
    private Object data;
}
```

#### 4.创建一个学生类

普通的学生类Student	

```java
package com.fan.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private String name;
    private int age;
}

```

#### 5.创建一个controller层

在com.fan下创建一个controller目录并创建一个StudentControll类

```java
package com.fan.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.fan.pojo.ResultSets;
import com.fan.pojo.Student;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class StudentControll {
    @GetMapping("/hello")
    public ResultSets test() {
        List<Student> stulist = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            stulist.add(new Student("student" + i, i));
        }
        ResultSets resultSets = new ResultSets();
        resultSets.setCode("100");
        resultSets.setData(jsonArrays);
        return resultSets;
    }
}

```



