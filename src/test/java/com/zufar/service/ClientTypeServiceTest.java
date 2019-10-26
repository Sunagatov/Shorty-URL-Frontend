package com.zufar.service;


import com.zufar.entity.ClientType;
import com.zufar.dto.ClientTypeDTO;
import com.zufar.repository.ClientTypeRepository;
import com.zufar.exception.ClientTypeNotFoundException;

import org.junit.Test;
import org.mockito.Mock;
import org.junit.BeforeClass;
import org.mockito.InjectMocks;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;


@RunWith(MockitoJUnitRunner.class)
public class ClientTypeServiceTest {

    @InjectMocks
    private ClientTypeService clientTypeService;

    @Mock
    private ClientTypeRepository clientTypeRepository;

    private static final Long clientTypeId = 1L;
    private static final Long invalidClientTypeId = 3435L;
    private static final List<ClientType> clientTypes = new ArrayList<>();
    private static final List<ClientTypeDTO> clientDTOTypes = new ArrayList<>();
    private static final ClientType clientType = new ClientType(clientTypeId, "ShortName1", "FullName1", "ClientTypeCode1");
    private static final ClientTypeDTO clientTypeDTO = new ClientTypeDTO(clientTypeId, "ShortName1", "FullName1", "ClientTypeCode1");


    @BeforeClass
    public static void setUp() {
        clientTypes.add(clientType);
        clientDTOTypes.add(clientTypeDTO);
    }

    @Test
    public void whenGetAllCalledThenCollectionShouldBeReturned() {
        when(clientTypeRepository.findAll()).thenReturn(clientTypes);

        List<ClientTypeDTO> expected = clientDTOTypes;
        List<ClientTypeDTO> actual = this.clientTypeService.getAll();

        verify(clientTypeRepository, times(1)).findAll();
        assertNotNull(actual);
        assertEquals(expected, actual);
    }


    @Test
    public void whenGetByIdCalledThenOrderShouldBeReturned() {
        when(clientTypeRepository.findById(clientTypeId)).thenReturn(Optional.of(clientType));
        when(clientTypeRepository.existsById(clientTypeId)).thenReturn(true);
        
        ClientTypeDTO expected = clientTypeDTO;
        ClientTypeDTO actual = this.clientTypeService.getById(clientTypeId);

        verify(clientTypeRepository, times(1)).findById(clientTypeId);
        verify(clientTypeRepository, times(1)).existsById(clientTypeId);

        assertNotNull(actual);
        assertEquals(expected, actual);
    }

    @Test(expected = ClientTypeNotFoundException.class)
    public void whenGetByIdWithInvalidIdThenOrderNotFoundExceptionShouldThrow() {
        when(clientTypeRepository.existsById(invalidClientTypeId)).thenReturn(false);

        clientTypeService.getById(invalidClientTypeId);
    }
}
